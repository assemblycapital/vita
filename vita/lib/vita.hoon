/-  sur=vita
=<  [sur .]
=,  sur
|%
::
++  enjs
  =,  enjs:format
  |%
  ++  action
    |=  act=^action
    ^-  json
    ~
  ++  desks
    |=  dex=(list desk)
    ^-  json
    :-  %a
    ^-  (list json)
    %+  turn  dex
    |=  =desk
    [%s desk]
  ++  metrics
    |=  met=^metrics
    ^-  json
    %-  pairs
    :-
      ['downloads' (downloads downloads.met)]
    :-
      ['activity' (activity activity.met)]
      ~
  ++  downloads
    |=  don=^downloads
    ^-  json
    %-  pairs
    :-
      ['cumulative' (set-ship cumulative.don)]
    :-
      ['latest' (set-ship latest.don)]
    :-
      ['history' (history history.don)]
      ~
  ++  activity
    |=  act=^activity
    ^-  json
    %-  pairs
    :-
      ['latest' (set-ship latest.act)]
    :-
      ['history' (history history.act)]
      ~
  ++  history
    |=  his=(list [@da @ud])
    ^-  json
    :-  %a
    %+  turn  his
      |=  it=[@da @ud]
      %-  pairs
      :-
        ['time' (sect -.it)]
      :-
        ['size' (numb +.it)]
        ~
  ++  set-ship
    |=  ships=(set @p)
    ^-  json
    :-  %a
    %+  turn
      ~(tap in ships)
      |=  her=@p
      [%s (scot %p her)]
  --
::
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  jon=json
    ^-  ^action
    *^action
  ++  metrics
    |=  jon=json
    ^-  ^metrics
    *^metrics
  --
++  webui
  |%
  ++  is-same-day
    ::TODO this was lazy,
    ::pretty much replicated from :vita helper core
    |=  [a=time b=time]
    ^-  ?
    =/  da  (yore a)
    =/  db  (yore b)
    ?&  =(y.-.da y.-.db)
        =(m.da m.db)
        =(d.t.da d.t.db)
    ==
  ++  render-dek-data
    |=  [dek-data=(map desk @ud)]
    ^-  manx
    =/  lek  ~(tap by dek-data)
    ;table
      =style  "margin:auto;padding-bottom:2vh;"
      ;tbody
      ;*  %+  turn  lek
        |=  n=[d=@tas a=@ud]
        ;tr
          ;td: {<d.n>}:
          ;td: {<a.n>}
        ==
      ==
    ==
  ++  page
    |=  [=bowl:gall apps=app-metrics]
    =/  dex=(list desk)  ~(tap in ~(key by apps))
    =|  dol=(map desk @ud)  :: downloads
    =.  dol
      |-
      ?~  dex  dol
      =/  met=metrics  (~(got by apps) i.dex)
      =.  dol
        %+  ~(put by dol)
        i.dex
        ~(wyt in latest.downloads.met)
      $(dex t.dex)
    =|  atv=(map desk @ud)  :: activity
    =.  atv
      |-
      ?~  dex  atv
      =/  met=metrics  (~(got by apps) i.dex)
      =.  atv
        ?~  history.activity.met
          atv
        ?.  (is-same-day -.i.history.activity.met now.bowl)
          atv
        %+  ~(put by atv)
            i.dex
            ~(wyt in latest.activity.met)
      $(dex t.dex)
    :: ~&  >>  [dol atv]
    ^-  manx
    ;html
      ;head
        ;title:"vita"
        ;style:"body \{ text-align: center; margin:0;}"
        ;meta(charset "utf-8");
        ;meta(name "viewport", content "width=device-width, initial-scale=1");
      ==
      ;body
        ;div
          :: height-wrapper
          =style  "height:100vh;max-height:100vh"
          ;h1: vita
          ;p
            ;a(target "_blank", href "https://github.com/assemblycapital/vita/#readme"): README
          ==
          ;p
            ;a(href "/apps/vita"): app deployment
          ==
          ;hr;
        
          ;div
          :: content
          =style  "overflow:scroll;padding-bottom:128px;"
            ;h3: downloads
            ;+  (render-dek-data dol)
            ;a/"/~/scry/vita/downloads.csv": downloads-history.csv
            ;br;
            ;hr;
            ;h3: activity
            ;+  (render-dek-data atv)
            ;a/"/~/scry/vita/activity.csv": activity-history.csv
          ==

          ;footer
            :: footer
            =style  "bottom:0;position:fixed;width:100%;background-color:white;"
            ;p
              =style  "margin:4px 0px;"
              ; {<our.bowl>}
            ==
            ;p
              =style  "margin:4px 0px;"
              ; {<now.bowl>}
            ==
            :: assembly capital logo
            ;svg(width "32", height "32", viewbox "0 0 388 194", fill "none", xmlns "http://www.w3.org/2000/svg")
              ;path(d "M194 0H97V97H0V194H97V97H194H291V194H388V97H291V0H194Z", fill "black");
            ==
          ==
        ==
      ==
    ==
  --
--