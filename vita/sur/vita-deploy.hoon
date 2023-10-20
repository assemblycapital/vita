/-  docket-sur=docket
|%
+$  desk-metadata
  $:
    exists-in-clay=_|
    is-installed=_|
    is-published=_|
    maybe-docket=(unit docket:docket-sur)
  ==
+$  update
  $%
    [%all-metadata all=(map desk desk-metadata)]
    [%desk-metadata =desk =desk-metadata]
  ==
+$  action
  $%
    [%new-desk desk-name=@tas]
    [%install desk-name=@tas]
    [%publish desk-name=@tas]
    [%unpublish desk-name=@tas]
    [%fetch-desk-metadata desk-name=@tas]
  ==
--
