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
  ==
--
