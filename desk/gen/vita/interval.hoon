/-  *vita
:-  %say
|=  $:  [now=@da eny=@uvJ bec=beak]
        arg=?(~ [tim=@dr ~])
        ~
    ==
:-  %vita-action
^-  action
?^  arg
  ~&  ['vita will fetch downloads every' tim.arg]
  [%set-interval [~ tim.arg]]
~&  ['vita turning off interval']
[%set-interval ~]
