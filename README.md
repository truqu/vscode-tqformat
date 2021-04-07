# tqformat

The `tqformat` extension allows formatting Erlang code using [tqformat](https://github.com/truqu/tqformat).

## Requirements

- Ensure `rebar3` is on your path
- Enable the `tqformat` rebar3 plugin in your project

## Extension Settings

Recommended configuration (to be added to your `settings.json`):

```
"[erlang]": {
  "editor.defaultFormatter": "truqu.tqformat",
  "editor.formatOnSave": true
}
```

## Release Notes

### 1.0.0

Initial release
