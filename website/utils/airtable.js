import fetch from 'node-fetch'

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN || ''

const FAKE_AIRTABLE_DATA = [
  {
    name: 'Masks for Doctors',
    href: 'https://google.com',
    tags: ['Healthcare', 'Restaurant', 'Donation']
  }
]

export async function getRecords({
  baseName = '',
  tableName = '',
  pageSize = 100,
  maxRecords = 100,
  view = 'Grid%20view'
}) {
  if (!AIRTABLE_TOKEN) {
    console.warn(
      'missing: process.env.AIRTABLE_TOKEN, using FAKE_AIRTABLE_DATA'
    )

    return FAKE_AIRTABLE_DATA
  }

  try {
    let result = await fetch(
      `https://api.airtable.com/v0/${baseName}/${tableName}?maxRecords=${maxRecords}&pageSize=${pageSize}&view=${view}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
    ).then(r => r.json())

    let { records } = result

    const recordsWithLocation = records.map(({ fields }) => {
      let location = {}

      try {
        location = JSON.parse(fields.location)
      } catch (_e) {}

      return {
        ...fields,
        location
      }
    })

    return shuffle(recordsWithLocation)
  } catch (err) {
    console.error(err)
    throw new Error('airtable: failed: ' + err.message)
  }
}

function shuffle(array) {
  return array
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
}
