# Action: JSON merge

```yaml
- name: Merge version into package.json
  uses: k15g/action-json-merge@edge
  with:
    file: package.json
    data: |
      version: 1.0.5
```