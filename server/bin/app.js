#! /usr/bin/env node
import 'dotenv/config'
import run from '..'

const port = process.env.PORT || 3001
const app = run({ port })
app.listen(port, () => {
  console.log(`Server has been started on ${port}`)
})
