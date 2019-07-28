#!/bin/bash
docker run -v "$(pwd)/public":/site 18fgsa/html-proofer /site --allow-hash-href --disable-external --check-html
