# Reproduction for issue with AG Grid, Redux and immutability

We encountered interesting issue with AG Grid, Redux and immutability, which we discovered after upgrading from AG Grid
27 to 30.

We persist filter model in DB and after fetching it from DB we keep it in Redux store.

When want to update grid filter model with the one stored in Redux store, we get following error:

```plaintext
Uncaught TypeError: Cannot add property conditions, object is not extensible
```

This is caused by AG Grid trying to add `conditions` property to the filter model, which is not allowed by Redux,
because it violates immutability.

As a solution, we can clone the filter model before passing it to AG Grid.

**Old Filter Model**:

```json
{
  "athlete": {
    "filterType": "text",
    "operator": "OR",
    "condition1": {
      "filterType": "text",
      "type": "contains",
      "filter": "mich"
    },
    "condition2": {
      "filterType": "text",
      "type": "contains",
      "filter": "jul"
    }
  }
}
```

**New Filter Model**:

```json
{
  "athlete": {
    "filterType": "text",
    "operator": "OR",
    "condition1": {
      "filterType": "text",
      "type": "contains",
      "filter": "mich"
    },
    "condition2": {
      "filterType": "text",
      "type": "contains",
      "filter": "jul"
    },
    "conditions": [
      {
        "filterType": "text",
        "type": "contains",
        "filter": "mich"
      },
      {
        "filterType": "text",
        "type": "contains",
        "filter": "jul"
      }
    ]
  }
}
```

## Run the example

```shell
npm install
npm run dev
```
