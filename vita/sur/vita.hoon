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
+$  app-metrics
  (map desk metrics)
+$  action
  $%
    [%del =desk]
    [%get =desk]
    [%get-all ~]
    [%activity =desk]
    [%set-interval period=(unit @dr)]
  ==
--
