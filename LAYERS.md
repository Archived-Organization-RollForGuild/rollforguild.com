# Layers

Managing `z-index` layers is the worst, so we use this document to manually track what layers each piece of our application lives on.

## 100
Inline, absolutely positioned content

### 101 - Dropdowns
The option list that is presented by dropdowns.

### 102 - Tooltips

## 200
The site navigation gets its own layer. It should appear above all website content on mobile devices, but it should always be the lowest in the stack of elements that overtake the rest of the website.

## 300
Elements that should take over the entire website, such as alerts and dialogs

### 301 - Dialogs

### 302 - Alerts
