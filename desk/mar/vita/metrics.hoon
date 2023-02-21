/-  store=vita
/+  *vita
::
|_  met=metrics:store
++  grad  %noun
++  grow
  |%
  ++  noun  met
  ++  json  (metrics:enjs met)
  :: ++  mime  [/text/plain (as-octs:mimes:html (metrics:enjs met))]
  --
::
++  grab
  |%
  ++  noun  metrics:store
  ++  json  metrics:dejs
  --
--
