import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

const normalizeHost = (host) => host.replace(/^www\./i, '').toLowerCase()

router.post('/', async (req, res) => {
  const { url } = req.body || {}

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL invalide ou manquante.' })
  }

  let parsed
  try {
    parsed = new URL(url.trim())
  } catch (error) {
    return res.status(400).json({ error: 'Le format du lien est invalide.' })
  }

  const normalizedHost = normalizeHost(parsed.hostname)
  const normalizedHref = parsed.href

  try {
    const [rows] = await pool.query(
      `
        SELECT id, name, domain, source_url
        FROM trusted_sources
        WHERE domain = ?
           OR ? LIKE CONCAT(source_url, '%')
        LIMIT 1
      `,
      [normalizedHost, normalizedHref],
    )

    if (rows.length > 0) {
      const source = rows[0]
      return res.json({
        reliable: true,
        score: 9,
        message: 'Cette publication provient d’une source de confiance référencée par Clarity.',
        source: {
          id: source.id,
          name: source.name,
          domain: source.domain,
          sourceUrl: source.source_url,
        },
        analysedUrl: normalizedHref,
      })
    }

    return res.json({
      reliable: false,
      score: 3,
      message:
        "Cette publication ne provient pas d'une source listée dans nos partenaires. Nous vous recommandons d'approfondir la vérification avant de la partager.",
      source: null,
      analysedUrl: normalizedHref,
    })
  } catch (error) {
    console.error('Analyse error:', error)
    return res.status(500).json({
      error: "Une erreur est survenue lors de l'analyse. Veuillez réessayer plus tard.",
    })
  }
})

export default router


