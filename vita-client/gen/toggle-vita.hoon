::  Tell app whether to share usage data with :vita
::
:: :myagent +mydesk!toggle-vita
::   enables sharing
:: :myagent +mydesk!toggle-vita &
::   enables sharing
:: :myagent +mydesk!toggle-vita |
::   disables sharing
::
:-  %say
|=  [* arg=?(~ [share=? ~]) ~]
:-  %vita-client
:-  %set-enabled
?^  arg
  share.arg
&
