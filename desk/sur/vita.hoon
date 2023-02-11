|%
:: vita
:: ::
+$  ships-by-time
  :: a current piece of data: (set ship),
  :: and its lent at various timestamps.
  $:
  latest=(set ship)
  history=(map time @ud)
  ==
+$  downloads  ships-by-time
+$  dailies    ships-by-time
+$  metrics
  [=downloads =dailies]
+$  action
  $%
    [%show =desk]
    [%delete =desk]
    [%get-downloads =desk]
  ==
--
