{{#with callback.options}}
callbacks.append(keras.callbacks.{{type}}(
{{#each settings}}
    {{name}}={{{quote value}}},
{{/each}}
))
{{/with}}