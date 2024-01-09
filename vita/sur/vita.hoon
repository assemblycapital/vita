|%
:: vita
:: :: :: :: :: ::
+$  app-metrics
  (map desk metrics)
+$  metrics
  [downloads=ships-by-time activity=ships-by-time]
+$  ships-by-time
  $:
  latest=(set ship)
  history=(map time moment)
  cumulative=(set ship)
  ==
+$  moment
  [size=@ud set=(unit (set ship))]
::
+$  action
  $%
    [%del =desk]
    [%get =desk]
    [%get-all ~]
    [%activity =desk]
    [%set-interval period=(unit @dr)]
    [%set-collect-full-moments boo=?]
  ==
:: :: :: :: :: ::
:: v0 (deprecated)
+$  nat  [time @ud]
+$  ships-by-time-0
  :: a current piece of data: (set ship),
  :: and its lent at various timestamps.
  $:
  latest=(set ship)
  history=(list nat)
  ==
+$  activity-0
    ships-by-time-0
+$  downloads-0
  $:  cumulative=(set ship)  :: all downloaders ever recorded
      ships-by-time-0
  ==
+$  metrics-0
  [downloads=downloads-0 activity=activity-0]
+$  app-metrics-0
  (map desk metrics-0)
:: :: :: :: :: :: 
--
