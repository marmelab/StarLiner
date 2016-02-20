import co from 'co';
import config from 'config';
import GithubApi from 'github';

const github = new GithubApi(config.github);
github.authenticate(config.github.authentication);

const stargazersCount = function* (repository) {
    const [user, repo] = repository.repository.split('/');
    const response = yield (cb => github.repos.get({ user, repo }, cb));

    return response.stargazers_count;
};

co(function* () {
    const count = yield stargazersCount(config.repositories[0]);
    console.log(count);
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
