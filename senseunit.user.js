(function() {
  /*
  // ==UserScript==
  // @name            SenseUnit
  // @namespace       http://github.com/linus/senseunit
  // @description     Convert imperial units into metric
  // ==/UserScript==
  */  var conversion, converter, i, matcher, node, regex, s, textnodes, units;
  units = {
    "inch(?:es)?": [2.54, "cm"],
    "(?:feet|foot)": [3.048, "dm"],
    "yard(?:es)?": [0.9144, "m"],
    "fathom(?:s)?": [1.853184, "m"],
    "rod(?:s)?": [5.0292, "m"],
    "chain(?:s)?": [20.1168, "m"],
    "furlong(?:s)?": [201.168, "m"],
    "mile(?:s)?": [1.609344, "km"],
    "nautical mile(?:s)?": [1.853184, "km"],
    "acre(?:s)?": [4046.8564224, "m2"],
    "(?:cu|sq|cubic) (?:in|inch(?:es)?)": [6.4516, "cm2"],
    "(?:floz|fluid ounce(?:s)?)": [2.84130625, "cl"],
    "pint(?:s)?": [5.6826125, "dl"],
    "quart(?:s)?": [1.1365225, "l"],
    "gallon(?:s)?": [4.54609, "l"],
    "grain(?:s)?": [64.79891, "mg"],
    "(?:oz|ounce(?:s)?)": [28.349523125, "g"],
    "(?:lb(?:s)?|pound(?:s)?)": [0.45359237, "kg"],
    "stone(?:s)?": [6.35029318, "kg"],
    "°F": function(str, number, offset, s) {
      return 5 / 9 * (parseFloat(number) - 32) + " °C";
    }
  };
  regex = {};
  for (matcher in units) {
    regex[matcher] = new RegExp("([\\d\\.,]+)\\s*" + matcher, "g");
  }
  converter = function(conversion) {
    var factor, unit;
    if (conversion instanceof Function) {
      return conversion;
    }
    factor = conversion[0], unit = conversion[1];
    return function(str, number, offset, s) {
      var converted;
      converted = Math.round(parseFloat(number) * factor * 10) / 10;
      return converted + " " + unit;
    };
  };
  textnodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  i = textnodes.snapshotLength;
  while (i--) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    for (matcher in units) {
      conversion = units[matcher];
      s = s.replace(regex[matcher], converter(conversion));
    }
    node.data = s;
  }
}).call(this);
