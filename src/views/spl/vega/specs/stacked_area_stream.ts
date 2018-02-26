export default {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
    "width": 300, "height": 200,
    "mark": "area",
    "encoding": {
      "x": {
        "timeUnit": "yearmonth", "field": "date", "type": "temporal",
        "axis": {"domain": false, "format": "%Y", "tickSize": 0}
      },
      "y": {
        "aggregate": "sum", "field": "count","type": "quantitative",
        "axis": null,
        "stack": "center"
      },
      "color": {"field":"series", "type":"nominal", "scale":{"scheme": "category20b"}}
    }
  }