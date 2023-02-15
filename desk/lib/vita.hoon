/-  sur=vita
=<  [sur .]
=,  sur
|%
::
++  enjs
  =,  enjs:format
  |%
  ++  action
    |=  act=^action
    ^-  json
    ~
  ++  metrics
    |=  met=^metrics
    ^-  json
    ~
  --
::
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  jon=json
    ^-  ^action
    *^action
  ++  metrics
    |=  jon=json
    ^-  ^metrics
    *^metrics
  --
--