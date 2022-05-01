#!/bin/bash
echo "Generating html.."
aglio -i ./ledger/ledger.apib --theme-template triple -o ./ledger/index.html
echo "Done!"
