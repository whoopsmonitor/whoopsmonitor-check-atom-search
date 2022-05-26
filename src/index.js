const WM_FEED_URL = process.env.WM_FEED_URL
const WM_SEARCH_FOR = process.env.WM_SEARCH_FOR
const WM_MINUTES_AGO = process.env.WM_MINUTES_AGO || 10
const rssParser = require('rss-parser')
let parser = new rssParser({
  customFields: {
    item: ['updated']
  }
});
const { DateTime, Duration } = require('luxon')

const nowMinus = DateTime.now().minus(Duration.fromObject({
  minutes: WM_MINUTES_AGO
}))

;(async function main() {
  try {
    const data = await parser.parseURL(WM_FEED_URL)

    // check the timestamp first
    data.items = data.items.filter(item => {
      const updated = DateTime.fromISO(item.updated)
      return updated > nowMinus
    })

    if (!data.items || !data.items.length) {
      console.log('No data in the feed.')
      process.exit(0)
    }

    const entries = []

    for (const entry of data.items) {
      if (entry.title.match(new RegExp(WM_SEARCH_FOR, 'gmi')) || entry.contentSnippet.match(new RegExp(WM_SEARCH_FOR, 'gmi'))) {
        entries.push(entry)
      }
    }

    if (!entries.length) {
      console.log('Searched keyword not found in the feed.')
      process.exit(0)
    }

    let output = ''

    for (const entry of entries) {
      output += `- [${entry.title}](${entry.link})`
      output += '\r'
    }

    console.log(output)
    process.exit(1) // "1" if we have some entries so we are able to submit notification later
  } catch (error) {
    console.error(error)
    console.log('Some error ocurred.')
    process.exit(2)
  }
})()
