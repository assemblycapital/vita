::  share daily activity with central :vita
::
|%
++  active
  |=  [=bowl:gall]
  ^-  card:agent:gall
  :*  %pass
      /
      %agent
      [our.bowl dap.bowl]
      %poke
      %vita-client
      !>([%log-activity ~])
  ==
++  active-to-parent
  |=  [parent=ship =bowl:gall]
  ^-  card:agent:gall
  %-  (slog leaf+"{<dap.bowl>} vita-client: sending activity to {<parent>}" ~)
  :*  %pass
      /
      %agent
      [parent %vita]
      %poke
      %vita-action
      !>([%activity q.byk.bowl])
  ==
::
+$  action
  $%
  [%set-enabled enabled=?]
  [%config cfg=[enabled=? parent=@p]]
  [%log-activity ~]
  ==
+$  config
  $:  enabled=_|
      vita-parent=ship
  ==
::
++  agent
  |=  [init=config]
  ^-  $-(agent:gall agent:gall)
  |^  agent
  ::
  +$  state-0
    $:  %0
        =config
        last=time
    ==
  +$  card  card:agent:gall
  ++  agent
    |=  inner=agent:gall
    =|  state-0
    =*  state  -
    ^-  agent:gall
    |_  =bowl:gall
    +*  this  .
        ag    ~(. inner bowl)
    ::
    ++  on-init
      ^-  (quip card _this)
      =.  config  init
      =^  cards  inner  on-init:ag
      [cards this]
    ++  on-save  !>([[%vita-client state] on-save:ag])
    ++  on-load
      |=  ole=vase
      ^-  (quip card _this)
      ?.  ?=([[%vita-client *] *] q.ole)
        =.  config  init
        =^  cards   inner   (on-load:ag ole)
        [cards this]
      ::
      :: reference lib/gossip to retain wrapper state
      =+  !<([[%vita-client old=state-0] ile=vase] ole)
      =.  state  old
      =^  cards  inner  (on-load:ag ile)
      [cards this]
    ++  on-poke
      |=  [=mark =vase]
      ^-  (quip card _this)
      ?:  ?=(%vita-client mark)
        ::TODO remove, replace with on-peek access
        ~&  ['vita-client on-poke' config]
        ?>  =(src.bowl our.bowl)
        =/  pok  !<(action vase)
        ?-  -.pok
            %set-enabled
          `this(enabled.config enabled.pok)
            %config
          `this(config cfg.pok)
            %log-activity
          ?.  enabled.config
            %-  (slog leaf+"{<dap.bowl>} vita-client: not sending activity, disabled." ~)
            `this
          ?.  (gth now.bowl (add last ~s30)) ::TODO ~d1 constant?
            %-  (slog leaf+"{<dap.bowl>} vita-client: not sending activity. already sent." ~)
            `this
          =.  last  now.bowl
          :_  this
          :~
            (active-to-parent vita-parent.config bowl)
          ==
        ==
      ::
      =^  cards  inner  (on-poke:ag mark vase)
      [cards this]
    ::
    ++  on-watch
      |=  =path
      ^-  (quip card _this)
      =^  cards  inner  (on-watch:ag path)
      [cards this]
    ::
    ++  on-leave
      |=  =path
      ^-  (quip card _this)
      =^  cards  inner  (on-leave:ag path)
      [cards this]
    ::
    ++  on-peek
      |=  =path
      ^-  (unit (unit cage))
      (on-peek:ag path)
    ::
    ++  on-agent
      |=  [=wire =sign:agent:gall]
      ^-  (quip card _this)
      =^  cards  inner  (on-agent:ag wire sign)
      [cards this]
    ::
    ++  on-arvo
      |=  [=wire =sign-arvo]
      ^-  (quip card _this)
      =^  cards  inner  (on-arvo:ag wire sign-arvo)
      [cards this]
    ::
    ++  on-fail
      |=  [=term =tang]
      ^-  (quip card _this)
      =^  cards  inner  (on-fail:ag term tang)
      [cards this]
    --
  --
--