FROM docker:18.06.1 as docker
FROM python:3.6

RUN set -ex; \
    apt-get update -qq; \
    apt-get install -y \
        locales \
        python-dev \
        git

COPY --from=docker /usr/local/bin/docker /usr/local/bin/docker
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8

# Install docker-compose and az cli
RUN pip install --upgrade pip
RUN pip install docker-compose azure-cli

# Install Functions Core Tools
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g azure-functions-core-tools  --unsafe-perm true

# Copy files
COPY app /cnab/app
COPY Dockerfile /cnab/Dockerfile

CMD ["/cnab/app/run"]