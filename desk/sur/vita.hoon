|%
:: vita
:: ::
+$  ships-by-time
  :: a current piece of data: (set ship),
  :: and its lent at various timestamps.
  $:
  latest=(set ship)
  history=(list nat)
  ==
+$  nat  [time @ud]
+$  downloads  ships-by-time
+$  activity   ships-by-time
+$  metrics
  [=downloads =activity]
+$  action
  $%
    [%del =desk]
    [%get =desk]
    ::
    [%declare-activity =time]
  ==
--
