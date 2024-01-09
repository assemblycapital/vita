/-  spider, tt=treaty
/+  strandio
/+  lib=vita-deploy
=,  strand=strand:spider
=>
|%
++  deploys
  |=  =desk
  |%
  ++  run
    |=  choice=?(%create %install %publish)
    =/  m  (strand ,~)
    ^-  form:m
    |=  tin=strand-input:strand
    =/  b  ~(. b:lib [our.bowl.tin now.bowl.tin])
    :_  [%done ~]
    :_  ~
    ?-  choice
      %create   (new-desk:b desk)
      %install  (install-desk:b desk)
      %publish  (publish-desk:b desk)
    ==
  --
--
^-  thread:spider
|=  arg=vase
=/  desk-name  !<(@tas arg)
=/  m  (strand ,vase)
^-  form:m
::
=/  dep  (deploys desk-name)
;<  ~         bind:m  (run:dep %create)
;<  ~         bind:m  (sleep:strandio ~s2)
::
;<  our=ship  bind:m  get-our:strandio
;<  now=@da   bind:m  get-time:strandio
=/  b     ~(. b:lib [our now])
?.  (has-desk:b desk-name)
  ::TODO retry?
  !!
;<  ~         bind:m  (run:dep %install)
;<  ~         bind:m  (run:dep %publish)
:: 
(pure:m !>(~))
