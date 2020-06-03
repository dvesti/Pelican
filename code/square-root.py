# -*- coding: utf-8 -*-
# Python Program to calculate the square root
# Note: change this value for a different result
## num = 8
# To take the input from the user
# num = float(input('Enter a number: '))
## num_sqrt = num ** 0.5
## print("The square root of %0.3f is %0.3f" % (num, num_sqrt))

#!/usr/bin/env python

from sympy import sqrt, pprint, Mul

x = sqrt(2)
y = sqrt(2)

pprint(Mul(x,  y, evaluate=False)) 
print('equals to ')
print(x * y)

