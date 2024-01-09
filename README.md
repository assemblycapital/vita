# 🛸 vita

keep track of your app distributions

to get downloads, `:vita` periodically scrys %cs /subs for each desk and caches the results.

`:vita` accepts foreign pokes attesting to activity on a desk.
`/lib/vita-client.hoon` helps any agent send vita activity pokes.
it sends a maximum of one poke per day, and allows users to opt-in / opt-out depending on developer preference.

## vita downloads

on-init, vita will fetch 'downloader' metrics on all of your published desks and print them out to dojo.

```
vita: our %basket has 20 subs
vita: our %noodle has 12 subs
vita: our %houston has 133 subs
vita: our %radio has 326 subs
```

this tells you how many active urbit ships are signed up for OTAs for each desk.

you can run this routine whenever you want with `:vita|g`

`:vita` automatically checks `:treaty` for published desks.

to register a different desk (e.g. %kids), do `:vita|g %kids`

```
vita: our %kids has 0 subs
> :vita|g %kids
>=
```

now, whenever `:vita` does its full routine, `%kids` will be included.

```
vita: our %kids has 0 subs
vita: our %basket has 20 subs
vita: our %noodle has 12 subs
vita: our %houston has 133 subs
vita: our %radio has 326 subs
> :vita|g
>=
```

to unregister a desk: `:vita|d %kids`. WARNING: all data collected on an unregistered desk will be lost.

once every 24 hours, `:vita` grabs downloads metrics on each registered desk using `.^((set ship) %cs /=mydesk=/subs)`. every time this scry is performed, `:vita` logs the size of the set with a timestamp. `:vita` keeps one copy of the latest full set of downloaders, and a cumulative set of all unique downloaders.

when users unsync from your local desk, `latest.downloads` wont go down until your next `|commit` to the desk.
`cumulative.downloads` only goes up.

to see all cumulative sizes: `=t +vita!total`

```
vita: %basket has 24 cumulative downloads
vita: %noodle has 14 cumulative downloads
vita: %houston has 139 cumulative downloads
vita: %radio has 359 cumulative downloads
> =t +vita!total
```

over time, `:vita` accumulates a `history=(map time [size=@ud set=(unit (set ship))])` for each desk.

to change the interval for automatic collection: `:vita|i ~h8` will change it to 8 hours from the default 24

to turn off the interval: `:vita|i` (no arg)

to enable collection of the full set of downloaders per day (instead of just the size) `:vita|f &`

## vita activity

`:vita` is also capable of collecting daily-active-users.

vita accepts `vita-action+[%activity =desk]` pokes from any source. it logs daily active users by adding users to a `latest=(set ship)`.
this set is cleared once a day. vita keeps record of the max size of this set each day in `history.activity`

now you just need users to poke `:~your-planet/vita &vita-action [%activity %yourdesk]` every time they use your app.

`/lib/vita-client/hoon` has a wrapper agent which does just that.

to use it, copy over `<this_repo>/vita-client/*` into your app desk, then `/+  vita-client` and wrap your agent with

```hoon
%-  %-  agent:vita-client
    ::  data collection on/off by default
    :-  &
    ::  @p of your distributor ship
    ~sampel-palnet
...
```

you will also need to give the `(active:vita-client bowl)` card somewhere in your agent where real user activity can be detected (e.g. on-watch for a frontend subscription path). this card will induce `vita-client` to send activity upstream to the parent `vita`.

`vita-client` is initialized with a boolean (sets collection on/off by default), and the `@p` of your distributor ship (running vita, with the app registered).

users can turn `vita-client` data collection on/off with `:myagent +mydesk!enable-vita` or `:tenna +mydesk!disable-vita`.
this uses some generators packaged with vita-client. the actual poke is just `:myagent &vita-client [%set-enabled |]`

`vita-client` sends a max of one activity poke per-day.

## frontend

the vita frontend displays the data collected by `:vita` plus some forms for app creation and maintenance. the `:vita-deploy` agent supports app creation and maintenance.

# installation

## install from livenet distribution

`|install ~nodmyn-dosrux %vita`

## install from source

1. create a blank `%vita` desk.
2. copy in basic app dependencies.
3. `|mount %vita`
4. cd `<this_repo>/vita`
5. `./install.sh -w <my_pier>/vita`
6. `|commit %vita`
7. `|install our %vita`

## urbit.org grant

https://urbit.org/grants/app-metrics
