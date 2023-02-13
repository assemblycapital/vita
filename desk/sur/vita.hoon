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
+$  activity
    ships-by-time
+$  downloads
  $:  cumulative=(set ship)  :: all downloaders ever recorded
      ships-by-time
  ==
+$  metrics
  [=downloads =activity]
+$  action
  $%
    [%del =desk]
    [%get =desk]
    [%get-all ~]
  ==
--
