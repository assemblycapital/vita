/-  spider
/+  strandio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
~&  'what'
;<  t=@da   bind:m  get-time:strandio
~&  'what'
;<  ~       bind:m  (sleep:strandio ~s2)
~&  'what'
;<  s=ship  bind:m  get-our:strandio
~&  'what'
(pure:m !>([s t]))
