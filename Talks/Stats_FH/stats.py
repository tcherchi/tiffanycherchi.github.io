import numpy as np


#__________________________#
def print_stats(success, n):
    '''
    a short function to print estimated
    proportion and standard deviation
    '''
    p = success/n
    print("proportion estimee, p=", p)
    std = np.sqrt(p*(1-p)/n)
    print("ecart-type estime, std=", std)
    return p, std
#__________________________#


#__________________________#
success, n = 2, 4
p, std = print_stats(success, n)

success, n = 18, 36
p, std = print_stats(success, n)

success, n = 1, 3
p, std = print_stats(success, n)
#__________________________#


#__________________________#
def print_IC(success, n):
    '''
    a short function to print estimated
    proportion, std, and IC
    '''
    p, std = print_stats(success, n)
    IC_low, IC_up = p-1.96*std, p+1.96*std
    print("IC= [", IC_low, ";", IC_up,"]")
    return p, std, IC_low, IC_up
#__________________________#


#__________________________#
success, n = 20, 40
ans = print_IC(success, n)

success, n = 180, 360
ans = print_IC(success, n)

success, n = 10, 30
ans = print_IC(success, n)
#__________________________#


#__________________________#
# Baccalaureat 2021
nb_math = 4883 + 5830 + 6063 + 9085 + 24157 + 26537 + 72985
nb_math_f = 2924 + 700 + 3210 + 915 + 12423 + 15786 + 26432
#p, std = print_stats(nb_math_f, nb_math)
ans = print_IC(nb_math_f, nb_math)
#__________________________#


#__________________________#
def z_test(success, n, p0):
    '''
    a short function to compute z
    '''
    p, std, ICl, ICu = print_IC(success, n)
    z = (p0-p) / std
    print("z= ", z)
    return z
#__________________________#


#__________________________#
# Baccalaureat 2021
p0 = .5
z = z_test(nb_math_f, nb_math, p0)
#__________________________#


#__________________________#
# section 26 MCF
MCF_26 = 1147
MCF_26_F = 387
z = z_test(MCF_26_F, MCF_26, p0=.5)
# si 541 ok
# z_test(541, MCF_26, p0=.5)
#__________________________#


#__________________________#
# section 26 PR
PR_26 = 629
PR_26_F = 101
z = z_test(PR_26_F, PR_26, p0=.5)
# si 290 ok
# z_test(290, PR_26, p0=.5)
#__________________________#


#__________________________#
# section 25 MCF
MCF_25 = 823
MCF_25_F = 155
z = z_test(MCF_25_F, MCF_25, p0=.5)
# si 384 ok
# z_test(384, MCF_25, p0=.5)
#__________________________#


#__________________________#
# section 25 PR
PR_25 = 498
PR_25_F = 31
z = z_test(PR_25_F, PR_25, p0=.5)
# si 228 ok
# z_test(228, PR_25, p0=.5)
#__________________________#



#__________________________#
# Baccalaureat 2021
total = 371705

total_Math = 149540
total_no_Math = total - total_Math ; total_no_Math

total_F = 210053
total_Math_F = 62390

total_G = total - total_F

total_Math_G = total_Math - total_Math_F ; total_Math_G

total_no_Math_F = total_F - total_Math_F ; total_no_Math_F
total_no_Math_G = total_G - total_Math_G ; total_no_Math_G
#__________________________#

