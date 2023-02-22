:: USE:
:: =t +vita!total
:: =myapp-total (~(got by t) %myapp)
::
:-  %say
|=  $:  [now=@da eny=@uvJ bec=beak]
        ~
        ~   
    ==  
:-  %noun
=*  our  p.bec
=/  deks=(list desk)
   ~(tap in .^((set desk) %gx /(scot %p our)/vita/(scot %da now)/desks/noun))
^-  (map desk (set ship))
=|  totals=(map desk (set ship))
|-  ?~  deks  totals
=/  ships  .^((set ship) %gx /(scot %p our)/vita/(scot %da now)/downloads/cumulative/[i.deks]/noun)
%-  (slog leaf+"vita: {<i.deks>} has {<~(wyt in ships)>} cumulative downloads" ~)
=.  totals  (~(put by totals) i.deks ships)
$(deks t.deks)
