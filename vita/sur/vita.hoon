|%
:: vita
:: ::
:: TODO v2
:: [ ] config option to collect activity as (list [time ship]) or something
::     ---
::     tbh I think doing (list [time (set ship)]) could make sense. keep much of the same logic
::      but: this makes it a little more difficult to do 
:: [ ] change data ingestion based on config
:: [ ] change csv formation based on config (hard)
:: ::
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
