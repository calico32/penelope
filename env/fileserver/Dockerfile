FROM ubuntu:24.04

RUN apt-get update && apt-get install -y \
  openssh-server \
  && rm -rf /var/lib/apt/lists/*

RUN echo 'root:password' | chpasswd
EXPOSE 22

COPY ./sshd_config /etc/ssh/sshd_config
COPY ./flag /flag

CMD ["/usr/sbin/sshd", "-D"]
