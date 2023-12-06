/-  docket-sur=docket
|%
+$  update
  $%
    [%desks desks=(set @tas)]
  ==
+$  action
  $%
    [%create-app desk-name=@tas]
    [%delete-app desk-name=@tas]
    [%get-desks ~]
    [%set-docket desk-name=@tas docket=docket:docket-sur] 
  ==
+$  inner-docket
  $:   title=@t
      info=@t
      color=@ux
      =href:docket-sur
      image=(unit @t)
      =version:docket-sur
      website=@t
      license=@t
  ==
--
