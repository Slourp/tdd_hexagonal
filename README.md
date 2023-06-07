# 💡 Craftsmanship en Développement Logiciel

## Principes du Craftsmanship :

- 👩‍🎓 Apprentissage continu : Le craftsmanship implique un engagement à améliorer en permanence ses compétences et ses connaissances dans le domaine du développement logiciel.
- 🌟 Orientation qualité : Le craftsmanship met l'accent sur la livraison d'un logiciel de haute qualité en accordant une attention aux détails, en garantissant la correction du code et en respectant les meilleures pratiques.
- 🧹 Code propre : Les artisans s'efforcent d'écrire un code propre, lisible et maintenable qui suit les normes et les principes de codage.
- ✔️ Tests : Le craftsmanship favorise une forte focalisation sur les tests automatisés pour garantir la fiabilité et la justesse du logiciel.
- 🤝 Collaboration : Les artisans accordent une grande importance à la collaboration et sollicitent activement les retours de leurs pairs pour améliorer leur travail et améliorer le résultat global.
- ♻️ Refactoring : Le craftsmanship encourage la pratique du refactoring régulier du code pour améliorer sa conception, sa maintenabilité et son efficacité.
- 🌍 Connaissance du domaine : Les artisans s'efforcent de comprendre le domaine dans lequel ils travaillent, ce qui leur permet de créer des solutions logicielles qui répondent efficacement aux exigences métier.
- 🎯 Simplicité : Le craftsmanship promeut le principe de simplicité, en évitant toute complexité inutile et en recherchant des solutions simples et élégantes.
- 📢 Communication : Les artisans accordent une grande importance à la communication efficace avec les parties prenantes, les membres de l'équipe et les utilisateurs, garantissant une compréhension claire des exigences et des attentes.
- 👔 Professionnalisme : Le craftsmanship englobe le professionnalisme dans le développement logiciel, y compris l'éthique, la responsabilité et l'engagement à apporter de la valeur aux clients ou aux utilisateurs finaux.

## Les 4 Axiomes du Craftsmanship :

1. 🚀 Rapid Feedback (Rétroaction Rapide) : Les artisans valorisent les cycles de feedback rapides pour obtenir des commentaires sur leur travail et pouvoir apporter des améliorations constantes.
2. 🔬 Assume Variability (Assumer la Variabilité) : Les artisans comprennent que la variabilité est une réalité du développement logiciel et s'adaptent aux changements de manière proactive plutôt que de résister à ces changements.
3. 🧪 Embrace Failure (Accepter l'Échec) : Les artisans considèrent les erreurs et les échecs comme des opportunités d'apprentissage et d'amélioration, encourageant l'expérimentation et l'innovation.
4. 🌱 Continuous Improvement (Amélioration Continue) : Les artisans cherchent constamment à s'améliorer en adoptant une approche itérative et en apprenant de leurs expériences, de leurs pairs et de la communauté.

Ces points capturent les principes fondamentaux du craftsmanship en développement logiciel, mettant en évidence l'importance de l'apprentissage continu, de la qualité, de la collaboration, de la simplicité et des axiomes du feedback rapide, de l'assomption de la variabilité, de l'acceptation de l'échec et de l'amélioration continue.


## Les qualités d'un logiciel :
### Stabilité

- **Change Failure Rate** (Taux d'échec lors des changements) : Mesure la capacité d'un logiciel à gérer les changements sans introduire de nouveaux problèmes ou de bugs. Un faible taux d'échec lors des changements indique que le logiciel est robuste et résistant aux modifications.
- **Recovery Failure Time** (Temps de récupération en cas d'échec) : Mesure la capacité d'un logiciel à se rétablir rapidement après un incident ou un échec. Un temps de récupération court minimise les interruptions de service et permet de restaurer les fonctionnalités normales du logiciel dans les plus brefs délais.

### Throughput (Fréquence de déploiement)

- **Lead time** (Temps nécessaire pour la mise en production d'une idée) : Mesure le temps écoulé depuis la conception d'une idée jusqu'à sa mise en production. Un lead time court permet une mise en production rapide des nouvelles fonctionnalités et idées.
- **Deployment Frequency** (Fréquence des changements publiés en production) : Mesure la fréquence à laquelle les changements et les nouvelles fonctionnalités sont déployés en production. Une fréquence élevée indique une capacité à itérer rapidement et à répondre aux besoins changeants du logiciel.

Ces deux aspects, la stabilité et le throughput, sont essentiels pour la création de logiciels performants et fiables. La stabilité garantit la résilience et la fiabilité du logiciel face aux changements, tandis que le throughput favorise une mise en production rapide et itérative des nouvelles fonctionnalités.

Ces qualités combinées contribuent à la satisfaction des utilisateurs, à la rentabilité des entreprises et à l'amélioration continue des applications logicielles.

## Principes F.I.R.S.T des tests unitaires

- **Fast (Rapides)** : Les tests unitaires doivent être rapides, c'est-à-dire qu'ils doivent s'exécuter rapidement pour permettre une rétroaction rapide sur l'état du code. Des tests lents peuvent ralentir le processus de développement et décourager leur exécution régulière.

- **Independent (Indépendants)** : Les tests unitaires doivent être indépendants les uns des autres, ce qui signifie qu'ils ne doivent pas dépendre de l'ordre d'exécution ou des résultats d'autres tests. Cela garantit que chaque test peut être exécuté individuellement et qu'un échec dans un test n'affecte pas les autres.

- **Repeatable (Reproductibles)** : Les tests unitaires doivent être reproductibles, ce qui signifie qu'ils doivent donner les mêmes résultats à chaque exécution. Cela permet de détecter rapidement les problèmes et d'assurer la fiabilité des tests.

- **Self-Validating (Auto-validants)** : Les tests unitaires doivent être auto-validants, c'est-à-dire qu'ils doivent pouvoir s'exécuter sans intervention manuelle et déterminer automatiquement si le résultat est conforme aux attentes. Cela facilite l'automatisation des tests et réduit les erreurs humaines.

- **Timely (Opportuns | Toughrough)** : Les tests unitaires doivent être écrits en même temps (ou même avant) le code qu'ils testent. Ils doivent être maintenus à jour au fur et à mesure que le code évolue. Cela garantit une couverture adéquate et permet de détecter rapidement les régressions.

Ces principes, y compris la lisibilité et la concision, aident à établir des bonnes pratiques pour la création et la maintenance des tests unitaires. En les suivant, vous pouvez créer des tests plus efficaces, fiables et évolutifs pour assurer la qualité du code.

## Pattern Object Mother (Test Data Builder)

Le pattern Object Mother est un patron de conception de création (creational design pattern) qui offre un moyen pratique de créer des instances d'objets complexes, généralement utilisé dans des scénarios de tests. Il est également connu sous le nom de Test Data Builder. Ce pattern permet d'encapsuler la logique de création d'objets et fournit une API claire et réutilisable pour la création de données de test.

Voici un exemple illustrant le pattern Object Mother :

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  // Getters and other methods...
}

class UserMother {
  static createJohnDoe() {
    return new User('John Doe', 'john@example.com');
  }

  static createJaneSmith() {
    return new User('Jane Smith', 'jane@example.com');
  }
}

// Utilisation :
const johnDoe = UserMother.createJohnDoe();
const janeSmith = UserMother.createJaneSmith();
```

Dans cet exemple, la classe `UserMother` encapsule la logique de création d'instances préconfigurées de la classe `User`. Elle fournit des méthodes statiques telles que `createJohnDoe()` et `createJaneSmith()` qui renvoient des instances de `User` préconfigurées avec des valeurs d'attributs spécifiques. Cela permet une création de données de test facile et cohérente, sans duplication de la logique de création d'objets dans différents cas de test.

En utilisant le pattern Object Mother, vous pouvez centraliser la création d'objets de test complexes, garantir la cohérence et améliorer la lisibilité de vos tests. Il offre une manière propre et réutilisable de créer des données de test, rendant vos tests plus faciles à maintenir et réduisant la duplication de code.

Veuillez noter que le pattern Object Mother n'est pas limité à la création de données de test ; il peut également être utilisé dans d'autres situations où vous devez créer des instances d'objets complexes avec des configurations prédéfinies.

J'espère que cela clarifie le pattern Object Mother pour vous. N'hésitez pas à me faire savoir si vous avez d'autres questions !

## Pattern Builder pour les tests

Le pattern Builder est un patron de conception de création (creational design pattern) qui permet de construire des objets complexes en étapes. Dans le contexte des tests, le pattern Builder est souvent utilisé pour créer des objets de test avec des configurations spécifiques de manière fluide et lisible.

Voici un exemple d'implémentation du pattern Builder pour les tests en JavaScript :

```javascript
class UserBuilder {
  constructor() {
    this.name = '';
    this.email = '';
    this.age = 0;
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withEmail(email) {
    this.email = email;
    return this;
  }

  withAge(age) {
    this.age = age;
    return this;
  }

  build() {
    return {
      name: this.name,
      email: this.email,
      age: this.age,
    };
  }
}

// Usage :
const user = new UserBuilder()
  .withName('John Doe')
  .withEmail('john@example.com')
  .withAge(25)
  .build();
```

Dans cet exemple, la classe `UserBuilder` définit les étapes de construction d'un objet `User` avec des attributs spécifiques. Les méthodes `withName`, `withEmail` et `withAge` permettent de définir les valeurs des attributs. La méthode `build` est utilisée pour créer un objet littéral avec les valeurs définies. L'utilisation fluide du pattern Builder permet de chaîner les appels de méthode de manière lisible et expressive.

Le pattern Builder facilite la création d'objets de test avec des configurations personnalisées sans avoir à spécifier tous les attributs à chaque fois. Il offre une syntaxe fluide et permet de rendre les tests plus lisibles et maintenables. De plus, le pattern Builder peut être étendu pour prendre en charge des scénarios plus complexes avec des configurations optionnelles ou conditionnelles.
