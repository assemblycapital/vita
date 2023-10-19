/-  sur=vita, docket-sur=docket
/+  docket-lib=docket
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
    =/  from  %vita
    =/  gall  &
    %^  new-desk:cloy  desk
      ~   
    %-  ~(gas by *(map path page:clay))
    |^  =;  paz
          :_  (turn paz mage)
          :+  /desk/docket-0  %docket-0
          (default-docket desk)
      ::
        ^-  (list path)
        :~
          /mar/noun/hoon
          /mar/hoon/hoon
          /mar/txt/hoon
          /mar/kelvin/hoon
          /mar/docket-0/hoon
          /lib/docket/hoon
          /sur/docket/hoon
          /sys/kelvin
          /mar/bill/hoon
          /mar/mime/hoon
          /mar/html/hoon
          /mar/css/hoon
          /mar/js/hoon
          /mar/json/hoon
          /lib/skeleton/hoon
          /lib/default-agent/hoon
          /lib/dbug/hoon
        ==
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
:: ::
++  default-glob-reference
  ^-  glob-reference:docket-sur
  :-  0v155e4.7i5n2.raqos.pfu60.8vgsg
  :-  %http
  'https://bwyl.nyc3.digitaloceanspaces.com/vita/example-app-globs/example-0-0v155e4.7i5n2.raqos.pfu60.8vgsg.glob'
::
++  default-docket
  |=  desk-name=@tas
  =|  d=docket:docket-sur
  =.  title.d  desk-name
  =.  href.d
    [%glob desk-name default-glob-reference]
  d
::
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