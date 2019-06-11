import { onReady, loadContent } from "unbounce"
import "./main.css"
import contentUrl from "./main.html"

onReady(() => {
  loadContent(contentUrl)
})
