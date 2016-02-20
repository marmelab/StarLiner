import config from 'config';
import GithubApi from 'github';
import koa from 'koa';

const app = koa();

const github = new GithubApi(config.github);
github.authenticate(config.github.authentication);

const stargazersCount = function* (repository) {
    const [user, repo] = repository.repository.split('/');
    const response = yield (cb => github.repos.get({ user, repo }, cb));

    return {
        name: repository.label,
        repository: repository.repository,
        stars: +response.stargazers_count
    };
};

app.use(function* () {
    this.body = yield config.repositories.map(r => stargazersCount(r));
});

app.listen(config.port);

console.log(`API is up and listening on port ${config.port}.`)
console.log(`Press CTRL+C to stop it...`)
