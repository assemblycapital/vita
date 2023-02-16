# vita

https://urbit.org/grants/app-metrics

keep track of your app distributions

how many users ever?
how many users today?

on-init, vita will fetch 'downloader' metrics on all of your published desks and print them out to dojo.

```
vita: our %basket has 20 subs
vita: our %noodle has 12 subs
vita: our %houston has 133 subs
vita: our %radio has 326 subs
```

you can run this routine whenever you want with `:vita|g`

`:vita` automatically checks `:treaty` for published desks. to register a desk outside of treaty (e.g. %kids), do `:vita|g %kids`

```
vita: our %kids has 0 subs
> :vita|g %kids
>=
```

the next time `:vita` does its full routine, `%kids` will be included.

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

over time, `:vita` accumulates a sorted `(list [time=@da size=@ud])` for each desk. This data can be exported as a csv, and visualized as a multiple line graph.
you can get the csv at https://yourship.com/~/scry/vita/downloads.csv

to change the interval for downloads metrics collection: `:vita|i ~h8` will change it to 8 hours.
to turn off automatic downloads metrics collection: `:vita|i` (no arg)

![](https://0x0.st/HrJf.png)
