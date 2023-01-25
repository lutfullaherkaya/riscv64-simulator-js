#include "vox_lib.h"

  .global main
  .text
  .align 2

# fun main();
main:
  addi sp, sp, -24
  sd ra, 16(sp)
            # arg 2
  li a0, 0
  li a1, 2
            # call .tmp0, "kare"
  call __vox_print__

  ld ra, 16(sp)
  addi sp, sp, 24
  li a0, 0
  ret
