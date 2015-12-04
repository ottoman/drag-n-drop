
# Use this facade to make it easier to make changes
# and handle React version upgrades.

# Ideally, having this will help out when React 
# makes api-breaking changes.
React = require "react"

module.exports = {
  # Create a react element
  em: (tag, props, children...) ->
    return if typeof tag is "string"
      # use createElement to create a React.DOM element
      React.createElement(tag, props, children...)
    else
      # For our own elements, need to wrap in createFactory()
      React.createFactory(tag)(props, children... )

  # Expose needed parts of the React API
  mount: (Comp, element) ->
    return React.render(Comp, element)

  createClass: React.createClass
  createFactory: React.createFactory

}
