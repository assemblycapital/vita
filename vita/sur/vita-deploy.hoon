/-  docket-sur=docket
|%
+$  desk-metadata
  $:
    exists-in-clay=_|
    is-installed=_|
    is-published=_|
    maybe-docket=(unit docket:docket-sur)
  ==
+$  action
  $%
    [%new-desk desk-name=@tas]
    [%fetch-desk-metadata desk-name=@tas]
  ==
--
