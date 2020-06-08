<a href="https://drivine.org"> ![DrivineSplash](https://raw.githubusercontent.com/liberation-data/drivine/master/docs/images/splash.jpg)</a>
# <a href="https://drivine.org">drivine.org</a>                                       

Drivine is a graph database client for Node.js and TypeScript. It was created with the following design goals: 

* Support multiple graph databases (simultaneously, if you wish). Currently [AgensGraph](https://bitnine.net/agensgraph/) and 
[Neo4j](https://neo4j.com/neo4j-graph-database/). 
* **Scale to hundreds and thousands of transactions per second, without compromising architectural integrity.**

---------------------------------------

With regards to the second point on scaleability, let's break that down into component facets. 

## Features

* Facilitates the use of <a href="https://drivine.org/guide/#/repositories">well understood object-oriented</a> and functional programming patterns. 
* Supports implementation of code that adheres to a single responsibility principle (SRP). [NestJS](https://nestjs.com/) will be optional, but is recommended. 
* Takes care of <a href="https://drivine.org/guide/#/persistence-manager">infrastructure concerns</a>, so that you can focus on making the most of your data. 
* <a href="https://drivine.org/guide/#/transactions">Removes boiler plate code</a>, especially the tedious and error-prone kind. 
* <a href="https://drivine.org/guide/#/cursors">Supports streaming</a>, without back-pressure. Large amounts of data can be managed in a timely and memory efficient manner. 
* Light-weight _use-case specific_ <a href="https://drivine.org/guide/#/object-mapping">object graph mapping (OGM)</a>.

## Quick Start

Follow the **<a href="https://drivine.org/guide/#/quick-start">Quick Start</a>** section in our **<a href="https://drivine.org/guide/#/quick-start">User Guide</a>**. 


Start creating repositories like the one below. 
```typescript
@Injectable()
export class RouteRepository {
    constructor(
        @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
        @InjectCypher('@/traffic/routesBetween') readonly routesBetween: CypherStatement) {
    }

    @Transactional() // Has default Propagation.REQUIRED - partipicate in a current txn, or start one.
    public async findFastestBetween(start: string, destination: string): Promise<Route> {
        return this.persistenceManager.getOne(
            new QuerySpecification<Route>()
                .withStatement(this.routesBetween)
                .bind([start, destination])
                .limit(1)
                .transform(Route)
        );
    }
}
```

## Example Applications

If you use `Drivine` and your code is public, feel free to make `PR` and add yourself to the list.

### Quick Start Template

Clone the official **[sample app](https://github.com/liberation-data/drivine-inspiration)** and start hacking. 

Repository: [github.com/liberation-data/drivine-inspiration)](https://github.com/liberation-data/drivine-inspiration) 

This sample is a basic starter template, with some tutorials. It has some endpoints for traffic routing, movies/films and other typical use-cases. Rather than start from scratch, choose the one that closely matches yours, and modify. 

### SlackMap

New version of [slackmap.com](https://slackmap.com) is full rewrite with technology update.
The `OrientDB` was replaced with `Neo4j` and we choose `Drivine` as the way to work with the database.

Check out how `Drivine` supports `Neo4j` in `Full Stack JavaScript App` using `Angular` + `Nest` + `Nx Workspace Monorepo`.

Repository: [github.com/SlackMap/slackmap](https://github.com/SlackMap/slackmap) 

* **master** branch - not released yet
* **develop** branch - has all the current work

## Documentation

Best way to learn Drivine is with our [User Guide](https://drivine.org/guide/#/).

---------------------------------------

## Tutorials

New to graph databases? Read some tutorials. 

* [Rock &amp; Roll Traffic Routing, with Neo4j](https://liberation-data.com/saxeburg-series/2018/11/28/rock-n-roll-traffic-routing.html) 
* [Rock &amp; Roll Traffic Routing, with Neo4j, Chapter Two](https://liberation-data.com/saxeburg-series/2018/12/05/rock-n-roll-traffic-routing.html) 

Have a tutorial you'd like to share? [Get in touch](https://twitter.com/doctor_cerulean) with me. 

---------------------------------------

## About

Drivine was created by [Jasper Blues](https://www.linkedin.com/in/jasper-blues-7781638) (that's me), who is also 
the creator of a popular iOS library called [Typhoon](https://github.com/appsquickly/typhoon) from 
[AppsQuick.ly](https://appsquick.ly). Typhoon is included in thousands of iOS apps including Audible.com, 
AMEX, Etihad Airlines, Singapore Airlines and others, so you're in good hands. 

The ideas behind this library were developed while developing graph-powered applications like <a href="https://apps.apple.com/us/app/vampr/id1069819177">Vampr</a>, which serve hundres/thousands of thransactions per second. I wanted to demonstrate how to use clean architecture patterns, and tools that remove boiler-plate, without sacrificing performance. I was informed in this tasks through experience as a past committer to the [Spring Framework](https://spring.io/) including on [Spring Data Neo4j](https://spring.io/projects/spring-data-neo4j). More iportantly, discussion and debate with colleagues, especially among those with experience applying mapping frameworks on applications that needed to exhibit high performance guided design choices.  I believe that Drivine strikes an excellent balance in these regards. Let me know what you think. 

## Feedback 

#### I'm not sure how to do [xyz]

> If you can't find what you need in the Quick Start or User Guides, please [post a question on StackOverflow](https://stackoverflow.com/questions/tagged/drivine?sort=newest&pageSize=15), using the Drivine tag. 

#### Interested in contributing?

> Great! A contribution guide, along with detailed documentation will be published in the coming days. 

#### I've found a bug, or have a feature request

> Please raise a <a href="https://github.com/liberation-data/drivine/issues">GitHub</a> issue.

## License

Copyright (c) 2020 Liberation Data

Drivine is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.
If not, see <http://www.gnu.org/licenses/>.
 
