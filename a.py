import numpy as np
import matplotlib.pyplot as plt

file = open('test.txt','w')
x = np.linspace(0,5000,5000)

y = []

for i in x:
    if i%100>=50:
        y.append(1)
    else:
        y.append(-1)

#y = np.cos(x)
fig, ax = plt.subplots()
ax.plot(x, y, linewidth=2.0)
plt.show()

for n in y:
    file.write(str(n)+',')
file.close()