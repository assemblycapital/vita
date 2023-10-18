/-  sur=vita
=<  [sur .]
=,  sur
|%
::
++  b
  |_  =bowl:gall
  ++  has-desk
    |=  =desk
    ^-  ?
    =/  bek=beak  [our.bowl %$ da+now.bowl]
    (~(has in .^((set ^desk) %cd (en-beam bek /))) desk)
  ::
  ++  new-desk
    :: referenced /gen/hood/new-desk
    ::
    |=  =desk
    ^-  card:agent:gall
    =;  h-pass
        [%pass /vita-deploy/new-desk %agent [our.bowl %hood] %poke helm-pass+!>(h-pass)]
    =/  from  %base
    =/  gall  &
    %^  new-desk:cloy  desk
      ~   
    %-  ~(gas by *(map path page:clay))
    |^  =-  (turn - mage)
        ^-  (list path)
        =/  common-files=(list path)  :~
            /mar/noun/hoon
            /mar/hoon/hoon
            /mar/txt/hoon
            /mar/kelvin/hoon
            /sys/kelvin
          ==
        =/  extra-files=(list path)  ?.  gall  [~]
          :~
            /mar/bill/hoon
            /mar/mime/hoon
            /mar/json/hoon
            /lib/skeleton/hoon
            /lib/default-agent/hoon
            /lib/dbug/hoon
          ==
        (weld common-files extra-files)
    ::
    ++  mage
      |=  =path
      :-  path
      ^-  page:clay
      :-  (rear path)
      ~|  [%missing-source-file from path]
      .^  *
        %cx
        (scot %p our.bowl)
        from
        (scot %da now.bowl)
        path
      ==
    --
  --
++  enjs
  =,  enjs:format
  |%
  ++  action
    |=  act=^action
    ^-  json
    ~
  --
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  jon=json
    ^-  ^action
    *^action
  --
--
