const config = require('config');
const GithubApi = require('github');
const koa = require('koa');

const app = koa();
app.use(require('koa-cors')());

const github = new GithubApi(config.github);
github.authenticate(config.github.authentication);

const stargazersCount = function* (repository) {
    const repositoryData = repository.repository.split('/');
    const user = repositoryData[0];
    const repo = repositoryData[1];

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
