/-  spider, tt=treaty
/+  strandio
/+  lib=vita-deploy
=,  strand=strand:spider
=>
|%
++  create-app
  |=  =desk
  =/  m  (strand ,~)
  ^-  form:m
  |=  tin=strand-input:strand
  =/  b     ~(. b:lib [our.bowl.tin now.bowl.tin])
  :_  [%done ~]
  ~[(new-desk:b desk)]
++  install-app
  |=  =desk
  =/  m  (strand ,~)
  ^-  form:m
  |=  tin=strand-input:strand
  =/  b     ~(. b:lib [our.bowl.tin now.bowl.tin])
  :_  [%done ~]
  ~[(install-desk:b desk)]
++  publish-app
  |=  =desk
  =/  m  (strand ,~)
  ^-  form:m
  |=  tin=strand-input:strand
  =/  b     ~(. b:lib [our.bowl.tin now.bowl.tin])
  :_  [%done ~]
  ~[(publish-desk:b desk)]
--
^-  thread:spider
|=  arg=vase
=/  desk-name  !<(@tas arg)
=/  m  (strand ,vase)
^-  form:m
::
;<  ~         bind:m  (create-app desk-name)
;<  ~         bind:m  (sleep:strandio ~s2)
::
;<  our=ship  bind:m  get-our:strandio
;<  now=@da   bind:m  get-time:strandio
=/  b     ~(. b:lib [our now])
?.  (has-desk:b desk-name)
  ::TODO retry?
  !!
;<  ~         bind:m  (install-app desk-name)
;<  ~         bind:m  (publish-app desk-name)
:: 
(pure:m !>([our now]))
