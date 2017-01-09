#!/bin/bash
sh -c 'echo 1013 > /sys/class/gpio/export'
sh -c 'echo out > /sys/class/gpio/gpio1013/direction'
sh -c 'echo 1 > /sys/class/gpio/gpio1013/value'
sleep 2
sh -c 'echo 0 > /sys/class/gpio/gpio1013/value'
sh -c 'echo 1013 > /sys/class/gpio/unexport'
