output.markdown('# Geocoding businesses')

let table = base.getTable('Donate Options')
let result = await table.selectRecordsAsync({
  sorts: [
    { field: 'location', direction: 'desc' },
    { field: 'address', direction: 'desc' }
  ]
})

const GOOGLE_MAPS_API_KEY = '<YOUR_GOOGLE_MAPS_API_KEY_HERE>'

await Promise.all(
  result.records.map(async record => {
    let address = record.getCellValue('address')
    let location = record.getCellValue('location')

    if (!address) {
      return
    }

    if (location) {
      output.text(`Skipping, location already exists: ${address}`)
      return
    }

    output.text(`Geocoding: ${address}`)

    let geo = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(
        ' ',
        '+'
      )}&key=${GOOGLE_MAPS_API_KEY}`
    ).then(r => r.json())

    if (!geo.results || geo.results.length === 0) {
      output.text(`No geocode results found for: ${address}`)
      return
    }

    let {
      geometry: {
        location: { lat, lng }
      }
    } = geo.results[0]

    return await table.updateRecordAsync(record, {
      location: JSON.stringify({ lat, lng })
    })
  })
)

output.markdown(`# Done!`)
