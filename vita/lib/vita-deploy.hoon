/-  sur=vita-deploy, docket-sur=docket
/+  docket-lib=docket
=<  [sur .]
=,  sur
|%
:: ::
++  b
  |_  [our=@p now=@da]
  ++  has-desk
    |=  =desk
    ^-  ?
    =/  bek=beak  [our %$ da+now]
    (~(has in .^((set ^desk) %cd (en-beam bek /))) desk)
  ::
  ++  install-desk
    :: referenced |install
    |=  =desk
    ^-  card:agent:gall
    [%pass /vita-deploy/install-app/[desk]/[(scot %da now)] %agent [our %hood] %poke [%kiln-install !>([desk our desk])]]
  ++  uninstall-desk
    |=  =desk
    ^-  card:agent:gall
    [%pass /vita-deploy/install-app/[desk]/[(scot %da now)] %agent [our %hood] %poke [%kiln-uninstall !>([desk])]]
  ++  publish-desk
    :: referenced :treaty|publish
    |=  =desk
    ^-  card:agent:gall
    [%pass /vita-deploy/publish-app/[desk]/[(scot %da now)] %agent [our %treaty] %poke [%alliance-update-0 !>([%add our desk])]]
  ++  unpublish-desk
    |=  =desk
    ^-  card:agent:gall
    [%pass /vita-deploy/publish-app/[desk]/[(scot %da now)] %agent [our %treaty] %poke [%alliance-update-0 !>([%del our desk])]]
  ++  new-desk
    :: referenced /gen/hood/new-desk
    ::
    |=  =desk
    ^-  card:agent:gall
    =;  h-pass
        [%pass /vita-deploy/new-desk %agent [our %hood] %poke helm-pass+!>(h-pass)]
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
        (scot %p our)
        from
        (scot %da now)
        path
      ==
    --
  --
:: ::
++  default-glob-reference
  ^-  glob-reference:docket-sur
  :-  0vsckvo.mrm5r.fl3kl.gtfdo.05mcb
  :-  %http
  'https://bwyl.nyc3.digitaloceanspaces.com/vita/example-app-globs/example-1-0vsckvo.mrm5r.fl3kl.gtfdo.05mcb.glob'
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
  ++  update
    |=  upd=^update
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    :-  -.upd
    |^
      ?-  -.upd
          %desks
        (en-desks +.upd)
      ==
    ++  en-desks
      |=  dez=(set @tas)
      :-  %a
      %+  turn  ~(tap in dez)
      |=  d=@tas
      [%s d]
    --
  --
::
++  dejs
  =,  dejs:format
  |%
  ++  patp
    (su ;~(pfix sig fed:ag))
  ++  action
    |=  jon=json
    ^-  ^action
    =<  (decode jon)
    |%
    ++  decode
      %-  of
      :~
        [%create-app so]
        [%delete-app so]
        [%get-desks ul]
          :-  %set-docket
        %-  ot
        :~  
          [%desk-name so]
          [%docket de-docket]
        ==
      ==
    --
  ++  de-docket
    |=  jon=json
    =|  dot=docket:docket-sur
    :-  %1
    =;  result=inner-docket:sur
      result
    =<  (decode jon)
    |%
      ++  decode
        %-  ot
        :~  
          [%title so]
          [%info so]
          [%color nu]
          [%href href]
          [%image image]
          [%version version]
          [%website so]
          [%license so]
        ==
    --
  ++  href 
    %-  of
    :~
      [%site pa]
      [%glob de-glob]
    ==
  ++  de-glob
    %-  ot
    :~
      [%base so]
      [%glob-reference de-glob-reference]
    ==
  ++  de-glob-reference
    %-  ot
    :~
      [%hash de-hash]
      [%location de-glob-location]
    ==
  ++  de-hash
    |=  jon=json
    =/  sip  (so jon)
    =/  saw  (slaw %uv sip)
    ?~  saw  !!
    u.saw
  ++  de-glob-location
    |=  jon=json
    ?>  ?=([%o *] jon)
    =/  http  (~(get by p.jon) 'http')
    ?~  http
      :-  %ames
      (patp (~(got by p.jon) 'ames'))
    :-  %http  (so u.http)
  ++  image 
    |=  jon=json
    ?~  jon  ~
    ?>  ?=(%s -.jon)
    ?:  =('' p.jon)  ~
    `p.jon
  ++  version
    |=  jon=json
    ^-  version:docket-sur
    ?>  ?=(%s -.jon)
    =/  res=(list @ud)
      (scan (trip p.jon) (more dot dem))
    ?>  =(3 (lent res))
    :+  (snag 0 res)
      (snag 1 res)
    (snag 2 res)
  ++  update
    |=  jon=json
    ^-  ^update
    *^update
  --
--
